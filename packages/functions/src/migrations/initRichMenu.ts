import '../alias'

import { RichMenu, RichMenuResponse } from '@line/bot-sdk'
import fs from 'fs'
import { lineClient } from '~/utils/line'
import { LIFF_LINK } from '~/utils/secrets'
;(async () => {
  try {
    const richMenuList = await lineClient.getRichMenuList()

    richMenuList.forEach(async (richMenu: RichMenuResponse) => {
      await lineClient.deleteRichMenu(richMenu.richMenuId)
    })

    const richMenu: RichMenu = {
      size: {
        width: 2500,
        height: 843
      },
      selected: true,
      name: 'richMenuInit',
      chatBarText: 'Tap to open',
      areas: [
        {
          bounds: {
            x: 0,
            y: 0,
            width: 2500,
            height: 843
          },
          action: {
            type: 'uri',
            uri: `${LIFF_LINK}`
          }
        }
      ]
    }

    const richMenuId = await lineClient.createRichMenu(richMenu)
    const buffer = fs.readFileSync(`${__dirname}/../../assets/images/richMenu.jpg`)

    await lineClient.setRichMenuImage(richMenuId, buffer)
    await lineClient.setDefaultRichMenu(richMenuId)
  } catch (err) {
    console.error(err)
  }
})()
