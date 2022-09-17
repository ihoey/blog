---
title: 《羊了个羊》程序员过关攻略
date: 2022-09-17 10:38:46
tags:
  - rust
categories: rust
---

**热搜第一羊了个羊**微信小游戏程序员过关攻略。

```rust
use std::{sync::Arc, time::Duration};

use anyhow::{anyhow, Result};

use reqwest::Client;

const USER_AGENT:&str = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E158 MicroMessenger/8.0.26(0x18002b36) NetType/5G Language/zh_CN";
const TOKEN:&str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ0MDkwNzMsIm5iZiI6MTY2MzMwNjg3MywiaWF0IjoxNjYzMzA1MDczLCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjo3NTY0NzI5NywiZGVidWciOiIiLCJsYW5nIjoiIn0.mPe9Y3ghiyXY1gNczgAyS4J9HC_jSu_5RitG4MVPSM4";

// 完成关卡
async fn finish_game(rank_time: Arc<u32>) -> Result<()> {
    let url = format!("https://cat-match.easygame2021.com/sheep/v1/game/game_over?rank_score=1&rank_state=1&rank_time={}&rank_role=1&skin=1", rank_time);

    let data = Client::builder()
        .user_agent(USER_AGENT)
        .timeout(Duration::from_secs(1))
        .build()?
        .get(url)
        .header("t", TOKEN.to_string())
        .header("Content-Type", "application/json")
        .header("host", "cat-match.easygame2021.com")
        .send()
        .await?
        .json::<serde_json::Value>()
        .await?;

    if data.get("err_code").is_some() && data.get("err_code").unwrap().as_u64().unwrap() == 0 {
        Ok(())
    } else {
        Err(anyhow!("请检查配置项t."))
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    let secs = Arc::new(10);
    let times = 10;
    for _ in 0..times {
        if let Err(e) = finish_game(secs.clone()).await {
            println!("闯关失败, {:?}", e);
        } else {
            println!("成功完成一次闯关!");
        };
    }
    Ok(())
}
```

- 本代码仅供学习交流，严禁用作商业行为！
- 因他人私自不正当使用造成的违法违规行为与本人无关！
- 如有任何问题可联系本人删除！
