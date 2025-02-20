# 4. Decorate your hello world completion
@weave.op()
def hello_world(name: str) -> str:
    completion = client.messages.create(
        model="us.anthropic.claude-3-5-sonnet-20241022-v2:0",
        max_tokens=64,
        system=greeter_prompt.format(),
        messages=[{"role": "user", "content": f"Hi, my name is {name}"}]
    )
    return {"greeting": completion.content[0].text}

# 5. Trace it!
hello_world("Jorge")