import { FlexComponent, FlexMessage } from '@line/bot-sdk'
import { postbackData } from '~/utils/postback'
import { showRate } from '~/utils/rate'
import { RateResult } from '../handlers/postbacks/confirm'

export const msgSelectGame = (docId: string, uuid: string): FlexMessage => {
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

export const msgConfirmResult = (
  participantList: string[],
  scoreList: number[],
  uuid: string,
  docId: string
): FlexMessage => {
  const bodyContents: FlexComponent[] = []
  participantList.forEach((participant: string, index: number) => {
    bodyContents.push({
      type: 'text',
      text: `${index + 1}位`
    })
    bodyContents.push({
      type: 'text',
      wrap: true,
      text: `${participant}: ${scoreList[index]}点`,
      align: 'center',
      weight: 'bold',
      size: 'lg'
    })
  })
  bodyContents.push({
    type: 'separator',
    margin: 'xl'
  })
  bodyContents.push({
    type: 'text',
    text: '上記でよろしいですか？',
    align: 'center',
    margin: 'xl'
  })

  return {
    type: 'flex',
    altText: '結果の確認',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: bodyContents
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '記録する',
              data: postbackData('confirm', '記録する', uuid, docId),
              displayText: '記録する'
            }
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: 'やり直す',
              data: postbackData('confirm', 'やり直す', uuid, docId),
              displayText: 'やり直す'
            },
            color: '#D93535'
          }
        ],
        flex: 0
      }
    }
  }
}

export const msgRateResult = (rateResultList: RateResult[]): FlexMessage => {
  const bodyContents: FlexComponent[] = []
  rateResultList.forEach((rateResult: RateResult) => {
    bodyContents.push({
      type: 'text',
      text: `${rateResult.userName}`,
      size: 'lg',
      margin: 'xl'
    })
    bodyContents.push({
      type: 'text',
      text: showRate(rateResult.newRate, rateResult.rateDiff),
      size: 'xl',
      align: 'center',
      margin: 'xl'
    })
  })

  return {
    type: 'flex',
    altText: 'レート更新',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'レート更新'
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: bodyContents,
        paddingTop: 'none'
      }
    }
  }
}
