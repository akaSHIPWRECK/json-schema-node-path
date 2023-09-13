document.addEventListener('DOMContentLoaded', function() {
    const jsonSchemaInput = document.getElementById('jsonSchema');
    const extractButton = document.getElementById('extractButton');
    const resultOutput = document.getElementById('resultOutput');

    extractButton.addEventListener('click', function() {
        const schema = jsonSchemaInput.value;
        const format = document.querySelector('input[name="format"]:checked').value;
        const paths = extractPaths(schema, format); // Implement this function
        resultOutput.textContent = paths;
    });

    function extractPaths(schema, format) {
        try {
            const parsedSchema = JSON.parse(schema);

            const paths = [];

            function traverse(obj, currentPath) {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const newPath = currentPath === '' ? key : `${currentPath}.${key}`;
                        paths.push(format === 'slash' ? newPath.replace(/\./g, '/') : newPath);

                        if (typeof obj[key] === 'object') {
                            traverse(obj[key], newPath);
                        }
                    }
                }
            }

            traverse(parsedSchema, '');

            return paths.join('\n');
        } catch (error) {
            console.error(error);
            return 'Error occurred while parsing JSON schema.';
        }
    }
});
