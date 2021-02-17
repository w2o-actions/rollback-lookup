// Core
const core = require('@actions/core');
const github = require('@actions/github');
// Extras
const axios = require('axios');
// Params
const token = core.getInput("token");
const repo = core.getInput('repo');
const workflowName = core.getInput('workflow');


const instance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token '+token
    }    
});


async function getWorkflowId(repo){
    try{
        return instance.get('repos/'+repo+'/actions/workflows')
        .then(function (response) {            
            for(const i of response.data.workflows){ 
                const name = i.name;
                const workflowId = i.id;
                if(name === workflowName){
                    return workflowId;
                }
            }   
        })
    }
    catch(error){
        console.log(error);
    }
}

async function getRuns(id){
    return instance.get('repos/'+repo+'/actions/workflows/'+id+'/runs?status=success&per_page=1')
      .then(function (response) {
        for(const i of response.data.workflow_runs){
            const workflowRunId = i.id;
            return workflowRunId;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
 

try{
    getWorkflowId(repo).then(async function (workflowId){
        console.log("here is the workflowId --> ", workflowId);
        await new Promise(resolve => resolve(getRuns(workflowId).then(async function (workflowRunId){
            console.log("here is workflow run id --> ", workflowRunId);
            core.setOutput("id", workflowRunId);
        })))
    })
}
catch(error){
    console.log(error)
}

