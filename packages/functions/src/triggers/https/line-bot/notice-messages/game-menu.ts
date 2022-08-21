export const msgGameMenu = {
  type: 'text',
  text: 'Select your favorite food category or send me your location!',
  quickReply: {
    items: [
      {
        type: 'action',
        imageUrl: 'https://example.com/sushi.png',
        action: {
          type: 'message',
          label: 'Sushi',
          text: 'Sushi'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://example.com/tempura.png',
        action: {
          type: 'message',
          label: 'Tempura',
          text: 'Tempura'
        }
      },
      {
        type: 'action',
        action: {
          type: 'location',
          label: 'Send location'
        }
      }
    ]
  }
}
