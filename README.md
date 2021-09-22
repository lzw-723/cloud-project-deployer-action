# ByteInspire Cloud Project GitHub Action

[![Build Status](https://github.com/byteinspire/cloud-project-deployer-action/actions/workflows/test.yml/badge.svg)](https://github.com/byteinspire/cloud-project-deployer-action/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Use this GitHub Action to deploy ByteInspire cloud project.

## Usage

Add a workflow (.github/workflows/deploy.yml):

```yml
name: Deploy Cloud Project

on: push

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      # Add any build steps here. For example:
      # - run: npm ci && npm run build
      - uses: byteinspire/cloud-project-deployer-action@v1
        with:
          service-id: '${{ secrets.SERVICE_ID }}'
          token: '${{ secrets.ACCESS_TOKEN }}'
          # Or you can use file param to directly specify the ziped file path
          directory: your-directory-path
```

## Inputs

| Parameter  | Required | Description                                                                           |
| ---------- | -------- | ------------------------------------------------------------------------------------- |
| service-id | Yes      | The Service ID in ByteInspire                                                         |
| token      | Yes      | The [access token or oauth token](https://qingfuwu.cn/dashboard/settings/pat) in ByteInspire, make sure the token has cloud project scope |
| directory  | No       | The location of your directory relative to the root of your repository                |
| file       | No       | The location of your ziped file relative to the root of your repository                 |
| changelog  | No       | Deployment changelog                                                             |

## Outputs

| Parameter   | Description                    |
| ----------- | ------------------------------ |
| version     | The version deployed this time |
| cloud-project-url | The default cloud project url        |

## License

MIT
