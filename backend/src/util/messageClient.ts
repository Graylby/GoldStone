// This file is auto-generated, don't edit it
import Dysmsapi, * as $Dysmsapi from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import Console from '@alicloud/tea-console';
import Util from '@alicloud/tea-util';
import Time from '@darabonba/time';
import String from '@alicloud/darabonba-string';
import { Provide } from '@midwayjs/decorator';

@Provide()
export default class Client {
  // 使用AK&SK初始化账号Client
  static createClient(accessKeyId: string, accessKeySecret: string): Dysmsapi {
    const config = new $OpenApi.Config({});
    config.accessKeyId = accessKeyId;
    config.accessKeySecret = accessKeySecret;
    return new Dysmsapi(config);
  }

  async mainFun(args: string[]): Promise<void> {
    // Env.getEnv('ACCESS_KEY_ID'),
    // Env.getEnv('ACCESS_KEY_SECRET')
    const client = Client.createClient(
      'LTAI5t6s15dxDmuX2yF3uycP',
      'pNllDBuJrSuBKPciPJ2kEpHCE8r6gN'
    );
    // 1.发送短信
    const sendReq = new $Dysmsapi.SendSmsRequest({
      phoneNumbers: args[0],
      signName: args[1],
      templateCode: args[2],
      templateParam: args[3],
    });
    const sendResp = await client.sendSms(sendReq);
    const code = sendResp.body.code;
    if (!Util.equalString(code, 'OK')) {
      Console.log(`错误信息: ${sendResp.body.message}`);
      return;
    }

    const bizId = sendResp.body.bizId;
    // 2. 等待 10 秒后查询结果
    await Util.sleep(10000);
    // 3.查询结果
    const phoneNums = String.split(args[0], ',', -1);

    for (const phoneNum of phoneNums) {
      const queryReq = new $Dysmsapi.QuerySendDetailsRequest({
        phoneNumber: Util.assertAsString(phoneNum),
        bizId: bizId,
        sendDate: Time.format('yyyyMMdd'),
        pageSize: 10,
        currentPage: 1,
      });
      const queryResp = await client.querySendDetails(queryReq);
      const dtos = queryResp.body.smsSendDetailDTOs.smsSendDetailDTO;
      // 打印结果

      for (const dto of dtos) {
        if (Util.equalString(`${dto.sendStatus}`, '3')) {
          Console.log(`${dto.phoneNum} 发送成功，接收时间: ${dto.receiveDate}`);
        } else if (Util.equalString(`${dto.sendStatus}`, '2')) {
          Console.log(`${dto.phoneNum} 发送失败`);
        } else {
          Console.log(`${dto.phoneNum} 正在发送中...`);
        }
      }
    }
  }
}

// Client.main(process.argv.slice(2));
