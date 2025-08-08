/**
 * Bedrock Converse API: Adds cache points to messages in the payload.
 * Bedrock requires `cachePoint` be a separate content block in the content array.
 * @param {Array<BaseMessage>} messages - The array of message objects.
 * @returns {Array<BaseMessage>} - The updated array of message objects with cache points added.
 */
function addBedrockCacheControl(messages) {
  if (!Array.isArray(messages) || messages.length < 2) {
    return messages;
  }

  const updatedMessages = [...messages];
  let messagesModified = 0;

  for (let i = updatedMessages.length - 1; i >= 0 && messagesModified < 2; i--) {
    const message = updatedMessages[i];

    if (typeof message.content === 'string') {
      message.content = [
        { type: 'text', text: message.content },
        { cachePoint: { type: 'default' } },
      ];
      messagesModified++;
      continue;
    } else if (Array.isArray(message.content)) {
      let inserted = false;
      for (let j = message.content.length - 1; j >= 0; j--) {
        const block = message.content[j];
        if (block && block.type === 'text') {
          message.content.splice(j + 1, 0, { cachePoint: { type: 'default' } });
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        message.content.push({ cachePoint: { type: 'default' } });
      }
      messagesModified++;
    }
  }

  return updatedMessages;
}

module.exports = { addBedrockCacheControl };
