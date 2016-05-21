royalts  -- A RoyalTS generator for node
========================================

## General information

This package will get you going since you can feed this a json and it will generate the document layout in XML format for you.
As of now, this will only support rtsz documents (which is the new layout) old one is not supported (rts)

## Installation

````
npm install royalts -S
````

To grab it and add it to your package.json.

## Usage

Require/import royalts, then issue a 'new RoyalDocument()'
Then give it as argument a json string.

See an example usage of a [simple api](https://github.com/riemers/royalts-api) (that handles a POST json)

## Example input

```
{
	"Type": "RoyalDocument",
	"Name": "Document Name",
	"Children": [{
		"Type": "RoyalFolder",
		"Name": "production",
		"Children": [{
			"Type": "RoyalSSHConnection",
			"Name": "coolserver",
			"URI": "10.20.30.40"
		}]
	}, {
		"Type": "RoyalFolder",
		"Name": "something",
		"Children": [{
			"Type": "RoyalFolder",
			"Name": "inside something",
			"Children": [{
				"Type": "RoyalSSHConnection",
				"Name": "coolserver2",
				"URI": "10.20.30.47"
			}]
		}, {
			"Type": "RoyalFolder",
			"Name": "Secret stash"
		}]
	}, {
		"Type": "RoyalFolder",
		"Name": "dev",
		"Children": [{
			"Type": "RoyalFolder",
			"Name": "secret stuff",
			"Children": [{
				"Type": "RoyalSSHConnection",
				"Name": "secretServer",
				"URI": "10.20.30.47"
			}]
		}, {
			"Type": "RoyalFolder",
			"Name": "Just my test"
		}]
	}]
}
```

This input follows the objects types found in the royal ts documentation. Found [here](https://content.royalapplications.com/Help/RoyalTS/V3/index.html) (Scripting->Reference->Object Properties)

The json string should always begin with a document of type RoyalDocument. Every item you create should have the "Type" value set.
In order to get nesting you should use children as the example above shows.

## Configuration defaults

The node package includes defaults for certain objects.
You can check out the src/defaults.js, so if you always want to have a Credential name, or always a certain color you can adjust that input.

Don't forget that you can also overwrite the default per entitiy. So you can also add on a entity:

```
CredentialFromParent: False
```

And it will override the default ones. For now only some default values are set for RoyalDocument/RoyalSSH/RoyalFolder but its easy to add your own, since its not mandatory to have defaults.
