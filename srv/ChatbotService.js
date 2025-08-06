const { handleAIExtraction } = require('./AICore'); 
const { assignGroupsToUser, revokeGroupsFromUser } = require('./Functions');

module.exports = cds.service.impl(function () {
  this.on('handleChatbotInput', async (req) => {
    const inputText = req.data.input;

    console.log(`[Chatbot] 🟢 Received input: ${inputText}`);

    // Step 1: Extract intent and info from AI Core (llmproxy)
    const { intent, email, groups, error } = await handleAIExtraction(inputText);

    if (error || !intent || !email || !groups?.length) {
      return {
        status: 'error',
        message: '❌ Could not extract enough info from input.',
        debug: error
      };
    }

    console.log(`[Chatbot] 🔍 Parsed intent: ${intent}, email: ${email}, groups: ${groups.join(', ')}`);

    // Step 2: Route action
    if (intent === 'assign') {
      return await assignGroupsToUser(email, groups);
    } else if (intent === 'revoke') {
      return await revokeGroupsFromUser(email, groups);
    } else {
      return { status: 'error', message: `❌ Unrecognized intent: ${intent}` };
    }
  });
});
