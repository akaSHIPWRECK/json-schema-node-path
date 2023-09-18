document.addEventListener('DOMContentLoaded', function() {
    const jsonSchemaInput = document.getElementById('jsonSchema');
    const extractButton = document.getElementById('extractButton');
    const resultOutput = document.getElementById('resultOutput');

    extractButton.addEventListener('click', function() {
        const schema = jsonSchemaInput.value;
        const paths = parseSchema(JSON.parse(schema));
        resultOutput.textContent = paths;
    });

    function parseSchema(schema, parentPath = "") {
        const allDef = schema.definitions;
        const result = [];

        function traverseDef(name) {
            if (allDef[name].properties) {
                const paths = [];
                for (const key in allDef[name].properties) {
                    if (allDef[name].properties[key].$ref) {
                        const propRef = allDef[name].properties[key].$ref.split('/').pop();
                        const subPaths = traverseDef(propRef);
                        paths.push(...subPaths.map(subPath => name + '.' + subPath));
                    } else {
                        paths.push(name + '.' + key);
                    }
                }
                return paths;
            } else {
                return [name];
            }
        }

        if (schema.properties) {
            for (const propName in schema.properties) {
                const propRef = schema.properties[propName].$ref.split('/').pop();
                const paths = traverseDef(propRef);
                result.push(...paths);
            }
        }

        return result.join('\n');
    }
});
