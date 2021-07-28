# Fake-the </> JSON
A simply project for write your desireable schema to generate fake data

## Usage
This project mostly based on [faker.js](https://github.com/marak/Faker.js/), You can use each API of the faker.js to make your schema.
Below added a sample schema for generate a simple JSON output.

```javascript
{
  type: "object",
  prop: {
  	name: {
    	type: "lorem.words",
        min: 5
    },
    comments: {
    	type: "array",
        prop: {
            id: {
                type: "datatype.uuid"
            },
            users: {
        	    type: "array",
                total: 3,
                prop: {
                    name: {
                        type: "name.firstName"
                    },
                    roles: {
                        type: "object",
                    prop: {
                        name: {
                            type: "name.lastName"
                        }
                    }
                    }
                }
            }
        }
    }
  }
}
```

## Contributing
Pull requests are welcome. For any changes, please open an issue first to discuss what you would like to change.