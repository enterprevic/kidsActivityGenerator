import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateActivity = async (filters = {}) => {
  const { category, timeRequired, energyLevel, ageRange } = filters;
  
  console.log('🎯 Generating activity with filters:', {
    category: category || 'any',
    timeRequired: timeRequired || 'any',
    energyLevel: energyLevel || 'any',
    ageRange: ageRange || 'any'
  });

  const systemPrompt = `You are a creative children's activity generator. Generate a fun, age-appropriate activity based on the given criteria. 
  Format the response as a JSON object with the following structure:
  {
    "title": "Activity Title",
    "category": "one of: Indoor activities, Outdoor activities, DIY crafts, Educational games, Physical exercises, Creative arts, Group games",
    "timeRequired": "one of: short, medium, long",
    "energyLevel": "one of: low, medium, high",
    "resources": ["list of required materials"],
    "indoor": boolean,
    "description": "Brief engaging description",
    "instructions": ["step 1", "step 2", "etc"],
    "ageRange": "appropriate age range (e.g., 4+, 5-7)",
    "funFact": "An interesting fact related to the activity"
  }`;

  const userPrompt = `Generate a children's activity with these criteria:
    ${category ? `Category: ${category}` : ''}
    ${timeRequired ? `Time Required: ${timeRequired}` : ''}
    ${energyLevel ? `Energy Level: ${energyLevel}` : ''}
    ${ageRange ? `Age Range: ${ageRange}` : ''}
    Make it fun, educational, and safe for children.`;

  console.log('📝 Sending prompts to OpenAI:', {
    systemPrompt,
    userPrompt
  });

  try {
    console.time('⏱️ API Response Time');
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });
    console.timeEnd('⏱️ API Response Time');

    const activity = JSON.parse(completion.choices[0].message.content);
    
    console.log('✨ Generated Activity:', {
      title: activity.title,
      category: activity.category,
      timeRequired: activity.timeRequired,
      energyLevel: activity.energyLevel,
      ageRange: activity.ageRange,
      tokensUsed: completion.usage.total_tokens
    });

    return { ...activity, id: Date.now() };
  } catch (error) {
    console.error('❌ Error generating activity:', {
      error: error.message,
      type: error.type,
      code: error.code,
      param: error.param
    });
    throw new Error('Failed to generate activity');
  }
};
