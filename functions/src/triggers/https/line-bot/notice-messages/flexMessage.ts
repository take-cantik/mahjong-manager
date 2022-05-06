import { FlexMessage } from '@line/bot-sdk'
import { postbackData } from '~/utils/postback'

export const selectGame = (docId: string, uuid: string): FlexMessage => {
  return {
    type: 'flex',
    altText: 'selectGame',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'ゲーム選択',
            size: 'lg',
            weight: 'bold'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '四人東',
              data: postbackData('game', '4-1', uuid, docId),
              displayText: '四人東'
            }
          },
          {
            type: 'separator'
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '四人南',
              data: postbackData('game', '4-2', uuid, docId),
              displayText: '四人南'
            }
          },
          {
            type: 'separator'
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '三人東',
              data: postbackData('game', '3-1', uuid, docId),
              displayText: '三人東'
            }
          },
          {
            type: 'separator'
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '三人南',
              data: postbackData('game', '3-2', uuid, docId),
              displayText: '三人南'
            }
          }
        ]
      }
    }
  }
}
