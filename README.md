# Analytics

This README holds actionable information about local development

# Local development

### Prequisites

- Docker
- Docker-compose
- taskfile https://taskfile.dev

### Initializing containers

To start all Docker containers

```bash
$ task start
```

To stop local development environment

```bash
$ task stop
```

To reset local development environment - this will delete database files and all node_module folders

```bash
$ task reset
```

To only reset database

```bash
$ task reset-db
```

To view logs for specific container

```bash
$ task log-analytics
$ task log-consumer
$ task log-provider
$ task log-mongo
```
