export const activities = [
  {
    id: 1,
    title: "Create a Paper Airplane",
    category: "DIY crafts",
    timeRequired: "short",
    energyLevel: "low",
    resources: ["paper"],
    indoor: true,
    description: "Learn to fold different types of paper airplanes and test which design flies the best!",
    instructions: [
      "Get a sheet of paper",
      "Fold it in half lengthwise",
      "Fold the corners to the center",
      "Fold the wings down",
      "Test and adjust your design"
    ],
    ageRange: "4+",
    funFact: "The world record for the longest paper airplane flight is 69.14 meters!"
  },
  {
    id: 2,
    title: "Backyard Scavenger Hunt",
    category: "Outdoor activities",
    timeRequired: "medium",
    energyLevel: "high",
    resources: ["printed checklist", "pencil"],
    indoor: false,
    description: "An exciting outdoor adventure finding natural treasures!",
    instructions: [
      "Create a list of items to find",
      "Give each player a checklist",
      "Set a time limit",
      "Start hunting!",
      "Compare findings at the end"
    ],
    ageRange: "5+",
    funFact: "Scavenger hunts were first popularized in the 1930s as party games!"
  },
  {
    id: 3,
    title: "Story Chain Game",
    category: "Creative arts",
    timeRequired: "medium",
    energyLevel: "low",
    resources: [],
    indoor: true,
    description: "Create an imaginative story together by taking turns adding sentences!",
    instructions: [
      "Sit in a circle",
      "First person starts with 'Once upon a time...'",
      "Each person adds one sentence",
      "Continue until story reaches natural end"
    ],
    ageRange: "6+",
    funFact: "This game helps develop creativity and listening skills!"
  },
  {
    id: 4,
    title: "Mini Scientists: Color Mixing",
    category: "Educational games",
    timeRequired: "medium",
    energyLevel: "low",
    resources: ["food coloring", "clear cups", "water", "spoons"],
    indoor: true,
    description: "Discover the magic of color mixing through fun experiments!",
    instructions: [
      "Fill cups with water",
      "Add different food colorings",
      "Mix colors to create new ones",
      "Record your discoveries"
    ],
    ageRange: "4+",
    funFact: "There are three primary colors that can make all other colors!"
  },
  {
    id: 5,
    title: "Dance Freeze",
    category: "Physical exercises",
    timeRequired: "short",
    energyLevel: "high",
    resources: ["music player"],
    indoor: true,
    description: "Dance when the music plays and freeze when it stops!",
    instructions: [
      "Play upbeat music",
      "Dance while music plays",
      "Freeze when music stops",
      "Last person moving is out"
    ],
    ageRange: "3+",
    funFact: "Dancing helps develop balance and coordination!"
  },
  {
    id: 6,
    title: "Nature Art",
    category: "Creative arts",
    timeRequired: "medium",
    energyLevel: "low",
    resources: ["paper", "glue", "collected nature items"],
    indoor: false,
    description: "Create beautiful artwork using items found in nature!",
    instructions: [
      "Collect leaves, flowers, and twigs",
      "Plan your design",
      "Arrange items on paper",
      "Glue everything in place"
    ],
    ageRange: "4+",
    funFact: "Artists have been using nature in art for thousands of years!"
  },
  {
    id: 7,
    title: "Balloon Volleyball",
    category: "Group games",
    timeRequired: "medium",
    energyLevel: "high",
    resources: ["balloons", "string/rope"],
    indoor: true,
    description: "A fun and safe version of volleyball using balloons!",
    instructions: [
      "Blow up several balloons",
      "Set up a 'net' using string",
      "Divide into teams",
      "Keep balloon from touching ground"
    ],
    ageRange: "5+",
    funFact: "Balloons stay in the air longer because they're lighter than air!"
  },
  {
    id: 8,
    title: "DIY Musical Instruments",
    category: "DIY crafts",
    timeRequired: "long",
    energyLevel: "medium",
    resources: ["empty containers", "dried beans/rice", "rubber bands", "decorations"],
    indoor: true,
    description: "Create your own musical instruments and start a band!",
    instructions: [
      "Make shakers with containers and beans",
      "Create guitars with boxes and rubber bands",
      "Decorate your instruments",
      "Put on a concert"
    ],
    ageRange: "5+",
    funFact: "The first musical instruments were made over 40,000 years ago!"
  },
  {
    id: 9,
    title: "Memory Card Game",
    category: "Educational games",
    timeRequired: "short",
    energyLevel: "low",
    resources: ["index cards", "markers"],
    indoor: true,
    description: "Create and play your own memory matching game!",
    instructions: [
      "Draw matching pairs on cards",
      "Shuffle and lay face down",
      "Take turns finding matches",
      "Person with most matches wins"
    ],
    ageRange: "4+",
    funFact: "Memory games help improve concentration and brain function!"
  },
  {
    id: 10,
    title: "Indoor Obstacle Course",
    category: "Physical exercises",
    timeRequired: "long",
    energyLevel: "high",
    resources: ["household items", "timer"],
    indoor: true,
    description: "Design and run through your own obstacle course!",
    instructions: [
      "Set up obstacles with furniture",
      "Create challenges (crawl, jump, etc.)",
      "Time each person's run",
      "Try to beat your best time"
    ],
    ageRange: "5+",
    funFact: "Obstacle courses were first used for military training!"
  }
];

export const categories = [
  "Indoor activities",
  "Outdoor activities",
  "DIY crafts",
  "Educational games",
  "Physical exercises",
  "Creative arts",
  "Group games"
];

export const timeOptions = [
  { value: "short", label: "Quick (<30 minutes)", icon: "" },
  { value: "medium", label: "Medium (30-60 minutes)", icon: "" },
  { value: "long", label: "Long (>60 minutes)", icon: "" }
];

export const energyLevels = [
  { value: "low", label: "Low Energy", icon: "" },
  { value: "medium", label: "Medium Energy", icon: "" },
  { value: "high", label: "High Energy", icon: "" }
];

export const ageGroups = [
  { value: "3-4", label: "3-4 years", icon: "" },
  { value: "5-6", label: "5-6 years", icon: "" },
  { value: "7-8", label: "7-8 years", icon: "" },
  { value: "9+", label: "9+ years", icon: "" }
];

export const seasonalThemes = [
  { value: "spring", label: "Spring Activities", icon: "" },
  { value: "summer", label: "Summer Fun", icon: "" },
  { value: "fall", label: "Fall Adventures", icon: "" },
  { value: "winter", label: "Winter Wonder", icon: "" }
];
