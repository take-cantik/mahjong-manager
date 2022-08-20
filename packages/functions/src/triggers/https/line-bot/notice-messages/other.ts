import { FlexMessage } from '@line/bot-sdk'
import { MY_LINE_LINK } from '~/utils/secrets'

export const msgError: FlexMessage = {
  type: 'flex',
  altText: 'エラーが発生しました',
  contents: {
    type: 'bubble',
    direction: 'ltr',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'エラーが発生しました',
          align: 'start',
          wrap: true
        }
      ]
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'button',
          action: {
            type: 'uri',
            label: '報告する',
            uri: MY_LINE_LINK
          },
          style: 'primary'
        }
      ]
    }
  }
}
