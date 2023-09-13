document.addEventListener('DOMContentLoaded', function() {
    const jsonSchemaInput = document.getElementById('jsonSchema');
    const extractButton = document.getElementById('extractButton');
    const resultOutput = document.getElementById('resultOutput');

    extractButton.addEventListener('click', function() {
        const schema = jsonSchemaInput.value;
        const paths = extractPaths(schema); // Implement this function
        resultOutput.textContent = paths;
    });

    function extractPaths(schema) {
    try {
        const parsedSchema = JSON.parse(schema);
        const paths = [];

        function traverse(obj, currentPath) {
            if (typeof obj === 'object') {
                paths.push(currentPath);
                for (const key in obj) {
                    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                        traverse(obj[key], currentPath === '' ? key : `${currentPath}.${key}`);
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
