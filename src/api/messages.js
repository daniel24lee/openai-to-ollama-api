// Convert messages to OpenAI format
export function convertMessages(messages) {
    return messages.map(message => {
        return { role: message.role, content: message.content || "" };
    });
}