# Workflow Run ID Lookup

## Purpose:
Easily lookup previous successful workflow run IDs

This is built to dynamically look at the worklow this action is installed within, but you can pass different repo or workflow names.


## How to use:

inputs

- token:
    - description: 'Personal Access Token'
    - required: true
- repo:
    - description: 'Github env variable'
    - required: true 
    - default: ${{ github.repository }} 
    - NOTE: this variable provides the following `org/repo` -- if you do not use the variable, be sure to follow this pattern
- workflow:
    - description: 'Github env variable'
    - required: true
    - default:  ${{ github.workflow }}
    - Note: you can identify any workfow by name, e.g. STAG


## Example:

```
jobs:
  workflow-run-identifier:
    runs-on: ubuntu-latest

    steps:
      - name: run-id
        id: run-id
        uses: w2o-actions/runid-lookup@v1.0.1
        with:
          repo: ${{ github.repository }} 
          workflow: ${{ github.workflow }}
          token: ${{ secrets.SA_PAT }}
      - name: Output
        run: |
          echo "The workflow run ID is ${{ steps.run-id.outputs.id }}"
          export RUN_ID=${{ steps.run-id.outputs.id }}
          echo $RUN_ID
```


