# openai-jsonl-generator

A simple nodejs script that takes in a MarkDown file, parses it and outputs the content to a JSONL file that you can use to finetune models with in OpenAI!

Here's a usage section for your README:

---

## Usage

This script converts an `input.md` file into a JSONL file that can be used to fine-tune an OpenAI model.

### Preparing `input.md`

Your input file should follow this structure:

```md
# --PROMPT
What is the capital of France?
# --ENDPROMPT

# --RESULT
The capital of France is Paris.
# --ENDRESULT

# --PROMPT
Who wrote "1984"?
# --ENDPROMPT

# --RESULT
"1984" was written by George Orwell.
# --ENDRESULT
```

Each prompt-response pair should be enclosed within `# --PROMPT` / `# --ENDPROMPT` and `# --RESULT` / `# --ENDRESULT`.

### Running the Script

To transform `input.md` into `output.jsonl`, run:

```sh
npm run parse
```
This will generate `output.jsonl` in the same directory.

### Output Format

The script will convert the input into the following JSON structure:

```json
{
  "messages": [
    {"role": "user", "content": "What is the capital of France?"},
    {"role": "assistant", "content": "The capital of France is Paris."},
    {"role": "user", "content": "Who wrote \"1984\"?"},
    {"role": "assistant", "content": "\"1984\" was written by George Orwell."}
  ]
}
```

This format is compatible with OpenAI's fine-tuning requirements.