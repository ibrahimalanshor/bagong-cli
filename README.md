# Bagong CLI

Bagong command line interface, for helping

## Install

```bash
npm install -g bagong-cli
```

## Command

### Create Bagong APP

```bash
bagong new <name>
```

### Create Bagong Module

```bash
bagong module:create <name> -opt
```

Options :

* -m, with model
* -r, with repository
* -s, with service
* -mr, with model and repository
* -ms, with model and service
* -mrs, with model, repository and service
* -rs, with repository and service
* -c, with crud generator

### Remove Bagong Module

```bash
bagong module:remove <name>
```

### Create Bagong Request

```bash
bagong request:request <name> -m 
```

Options :

* -m, module name