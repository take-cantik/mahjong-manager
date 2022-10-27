import { FlexMessage } from '@line/bot-sdk'

export const msgWeeklyNotification = (
  fourCurrentRate: number,
  fourLastWeekRate: number,
  threeCurrentRate: number,
  threeLastWeekRate: number
): FlexMessage => {
  const fourDiff = fourCurrentRate - fourLastWeekRate
  const fourDiffStr = fourDiff >= 0 ? `+${fourDiff}` : `${fourDiff}`

  const threeDiff = threeCurrentRate - threeLastWeekRate
  const threeDiffStr = fourDiff >= 0 ? `+${threeDiff}` : `${threeDiff}`

  return {
    type: 'flex',
    altText: '今週のレート変遷',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        contents: [
          {
            type: 'text',
            text: '今週のレート変遷',
            weight: 'bold',
            size: 'md',
            position: 'relative',
            margin: 'none',
            color: '#ffffff'
          }
        ],
        layout: 'vertical',
        paddingAll: 'xl',
        paddingStart: 'xxl',
        backgroundColor: '#52B14D'
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            weight: 'bold',
            size: 'lg',
            text: '四人麻雀'
          },
          {
            type: 'text',
            margin: 'lg',
            text: '現在のレート'
          },
          {
            type: 'text',
            align: 'center',
            wrap: true,
            margin: 'xl',
            size: 'lg',
            text: `${fourCurrentRate}`
          },
          {
            type: 'text',
            align: 'center',
            wrap: true,
            margin: 'lg',
            size: 'md',
            text: `(先週との差: ${fourDiffStr})`
          },
          {
            type: 'separator',
            margin: 'xl'
          },
          {
            type: 'text',
            margin: 'xl',
            weight: 'bold',
            size: 'lg',
            text: '三人麻雀'
          },
          {
            type: 'text',
            margin: 'lg',
            text: '現在のレート'
          },
          {
            type: 'text',
            align: 'center',
            wrap: true,
            margin: 'xl',
            size: 'lg',
            text: `${threeCurrentRate}`
          },
          {
            type: 'text',
            align: 'center',
            wrap: true,
            margin: 'lg',
            size: 'md',
            text: `(先週との差: ${threeDiffStr})`
          }
        ],
        paddingAll: 'xxl'
      }
    }
  }
}
