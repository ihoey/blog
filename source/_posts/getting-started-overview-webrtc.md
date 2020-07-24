---
title: WebRTC 入门指南
tags:
  - WebRTC
categories:
  - WebRTC
date: 2020-07-24 14:32:14
---

**WebRTC (Web Real-Time Communications)** 是由谷歌开源并推进纳入 `W3C` 标准的一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点`（Peer-to-Peer）`的连接，实现视频流和（或）音频流或者其他任意数据的传输。`WebRTC` 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点`（Peer-to-Peer）`的数据分享和电话会议成为可能。

> 与 `Web` 世界经典的 `B/S` 架构最大的不同是，`WebRTC` 的通信不经过服务器，而直接与客户端连接，在节省服务器资源的同时，提高通信效率。为了做到这点，一个典型的 `WebRTC` 通信过程，包含四个步骤：`找到对方`->`进行协商`->`建立连接`->`开始通讯`。下面将分别阐述这四个步骤。

<!--more-->

## 找到对方

> 虽然不需要经过服务器进行通信，但是在开始通信之前，必须知道对方的存在，这个时候就需要信令服务器。

### 信令服务器

> 所谓信令`（signaling）`服务器，是一个帮助双方建立连接的「中间人」，`WebRTC` 并没有规定信令服务器的标准，意味着开发者可以用任何技术来实现，如 `WebSocket` 或 `AJAX`。

发起 `WebRTC` 通信的两端被称为对等端`（Peer）`，成功建立的连接被称为 `PeerConnection`，一次 `WebRTC` 通信可包含多个 `PeerConnection`。

```js
const pc2 = new RTCPeerConnection([configuration]);
```

在寻找对等端阶段，信令服务器的工作一般是标识与验证参与者的身份，浏览器连接信令服务器并发送会话必须的信息，如房间号、账号信息等，由信令服务器找到可以通信的对等端并开始尝试通信。

其实在整个 `WebRTC` 通信过程中，信令服务器都是一个非常重要的角色，除了上述作用，`SDP` 交换、`ICE` 连接等都离不开信令，后文将会提到。

## 进行协商

> 协商过程主要指 `SDP` 协议交换。

### SDP

> `SDP（Session Description Protocol）`指会话描述协议，是一种通用的协议，使用范围不仅限于 `WebRTC`。主要用来描述多媒体会话，用途包括会话声明、会话邀请、会话初始化等。

在 `WebRTC` 中，`SDP` 协议主要用来描述：

- 设备支持的媒体能力，包括编解码器等
- `ICE` 候选地址
- 流媒体传输协议

`SDP` 协议基于文本，格式非常简单，它由多个行组成，每一行都为以下格式：

```s
type=value;
```

> 其中，`type` 表示属性名，`value` 表示属性值，具体格式与 `type` 有关。下面是一份典型的 `SDP` 协议样例：

```s
v=0
o=alice 2890844526 2890844526 IN IP4 host.anywhere.com
s=
c=IN IP4 host.anywhere.com
t=0 0
m=audio 49170 RTP/AVP 0
a=rtpmap:0 PCMU/8000
m=video 51372 RTP/AVP 31
a=rtpmap:31 H261/90000
m=video 53000 RTP/AVP 32
a=rtpmap:32 MPV/90000
```

> 其中：

| 属性名 | 属性说明                                               |
| ------ | ------------------------------------------------------ |
| v      | 代表协议版本号                                         |
| o      | 代表会话发起者，包括 `username、sessionId` 等          |
| s      | 代表 `session` 名称，为唯一字段                        |
| c      | 代表连接信息，包括网络类型、地址类型、地址等           |
| c      | 代表会话时间，包括开始/结束时间，均为 `0` 表示持久会话 |
| m      | 代表媒体描述，包括媒体类型、端口、传输协议、媒体格式等 |
| a      | 代表附加属性，此处用于对媒体协议进行扩展               |

### Plan B VS Unified Plan

> 在 `WebRTC` 发展过程中，`SDP` 格式 `（semantics）` 也发生了多次改变，目前使用最多的是 `Plan B` 和 `Unified Plan` 两种。两者均可在一个 `PeerConnection` 中表示多路媒体流，区别在于：

- `Plan B`: 所有视频流和所有音频流各自放在一个 `m=值` 里，用 `ssrc` 区分
- `Unified Plan`: 每路流各自用一个 `m=值`

目前最新发布的 `WebRTC 1.0` 采用的是 `Unified Plan`，已被主流浏览器支持并默认开启。`Chrome` 浏览器支持通过以下 `API` 获取当前使用的 `semantics`:

```js
// Chrome
RTCPeerConnection.getConfiguration().sdpSemantics; // 'unified-plan' or 'plan b'
```

### 协商过程

> 协商过程并不复杂，如下图所示:

会话发起者通过 `createOffer` 创建一个 `offer`，经过信令服务器发送到接收方，接收方调用 `createAnswer` 创建 `answer` 并返回给发送方，完成交换。

```js
// 发送方，sendOffer/onReveiveAnswer 为伪方法
const pc1 = new RTCPeerConnection();
const offer = await pc1.createOffer();

pc1.setLocalDescription(offer);

sendOffer(offer);

onReveiveAnswer((answer) => {
  pc1.setRemoteDescription(answer);
});

// 接收方，sendAnswer/onReveiveOffer 为伪方法
const pc2 = new RTCPeerConnection();

onReveiveOffer((offer) => {
  pc2.setRemoteDescription(answer);
  const answer = await pc2.createAnswer();
  pc2.setLocalDescription(answer);
  sendAnswer(answer);
});
```

需要注意的是，随着通信过程中双方相关信息的变化，SDP 交换可能会进行多次。

## 建立连接

> 现代互联网环境非常复杂，我们的设备通常隐藏在层层网关后面，因此，要建立直接的连接，还需要知道双方可用的连接地址，这个过程被称为 `NAT` 穿越，主要由 `ICE` 服务器完成，所以也称为 `ICE` 打洞。

### ICE

> `ICE（Interactive Connectivity Establishment）` 服务器是独立于通信双方外的第三方服务器，其主要作用，是获取设备的可用地址，供对等端进行连接，由 `STUN（Session Traversal Utilities for NAT）` 服务器来完成。每一个可用地址，都被称为一个 `ICE` 候选项 `（ICE Candidate）`，浏览器将从候选项中选出最合适的使用。其中，候选项的类型及优先级如下：

- 主机候选项: 通过设备网卡获取，通常是内网地址，优先级最高
- 反射地址候选项: 由 `ICE` 服务器获取，属于设备在外网的地址，获取过程比较复杂，可以简单理解为：浏览器向服务器发送多个检测请求，根据服务器的返回情况，来综合判断并获知自身在公网中的地址
- 中继候选项: 由 `ICE` 中继服务器提供，前两者都行不通之后的兜底选择，优先级最低

新建 `PeerConnection` 时可指定 `ICE` 服务器地址，每次 `WebRTC` 找到一个可用的候选项，都会触发一次 `icecandidate` 事件，此时可调用 `addIceCandidate` 方法来将候选项添加到通信中：

```js
const pc = new RTCPeerConnection({
  iceServers: [
    { url: "stun:stun.l.google.com:19302" },
    { url: "turn:user@turnserver.com", credential: "pass" },
  ], // 配置 ICE 服务器
});
pc.addEventListener("icecandidate", (e) => {
  pc.addIceCandidate(event.candidate);
});
```

> 通过候选项建立的 `ICE` 连接，可以大致分为下图两种情况：

1. 直接 `P2P` 的连接，为上述 `1&2` 两种候选项的情况;
2. 通过 `TURN（Traversal Using Relays around NAT）`中继服务器的连接，为上述第三种情况。

同样的，由于网络变动等原因，通信过程中的 `ICE` 打洞，同样可能发生多次。

## 进行通信

> `WebRTC` 选择了 `UDP` 作为底层传输协议。为什么不选择可靠性更强的 `TCP`？原因主要有三个：

- `UDP` 协议无连接，资源消耗小，速度快
- 传输过程中少量的数据损失影响不大
- `TCP` 协议的超时重连机制会造成非常明显的延迟

> 而在 `UDP` 之上，`WebRTC` 使用了再封装的 `RTP` 与 `RTCP` 两个协议：

- `RTP（Realtime Transport Protocol）`: 实时传输协议，主要用来传输对实时性要求比较高的数据，比如音视频数据
- `RTCP（RTP Trasport Control Protocol）`: `RTP` 传输控制协议，顾名思义，主要用来监控数据传输的质量，并给予数据发送方反馈。

在实际通信过程中，两种协议的数据收发会同时进行。

### 关键 API

> 下面将以一个 `demo` 及其代码，来展示前端 `WebRTC` 的能力及其使用的 `API`:

<div>
  <div id="container">
    <video id="localVideo" playsinline autoplay muted style="width:300px;height:200px;"></video>
    <video id="remoteVideo" playsinline autoplay style="width:300px;height:200px;"></video>
    <div class="box">
      <button id="startButton">Start</button>
      <button id="callButton">Call</button>
    </div>
  </div>
  <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
  <script>
    const startButton = document.getElementById("startButton");
    const callButton = document.getElementById("callButton");
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");
    callButton.disabled = true;
    startButton.addEventListener("click", start);
    callButton.addEventListener("click", call);
    let localStream;
    let pc1;
    let pc2;
    const offerOptions = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    };
    async function start() {
      startButton.disabled = true;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      localVideo.srcObject = stream;
      localStream = stream;
      callButton.disabled = false;
    }
    function gotRemoteStream(e) {
      if (remoteVideo.srcObject !== e.streams[0]) {
        remoteVideo.srcObject = e.streams[0];
        console.log("pc2 received remote stream");
        setTimeout(() => {
          pc1.getStats(null).then(stats => console.log(stats));
        }, 2000);
      }
    }
    function getName(pc) {
      return pc === pc1 ? "pc1" : "pc2";
    }
    function getOtherPc(pc) {
      return pc === pc1 ? pc2 : pc1;
    }
    async function call() {
      pc1 = new RTCPeerConnection();
      //  {
      //   sdpSemantics: "unified-plan", // 指定使用 unified plan
      //   iceServers:
      //   [
      //      { url: "stun:stun.l.google.com:19302" },
      //      { url: "turn:user@turnserver.com", credential: "pass" }
      //   ] // 配置 ICE 服务器
      // }
      pc1.addEventListener("icecandidate", e => onIceCandidate(pc1, e)); // 监听 ice 候选项事件
      pc2 = new RTCPeerConnection();
      pc2.addEventListener("icecandidate", e => onIceCandidate(pc2, e));
      pc2.addEventListener("track", gotRemoteStream);
      localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));
      const offer = await pc1.createOffer(offerOptions); // 创建 offer
      await onCreateOfferSuccess(offer);
      callButton.disabled = true;
    }
    async function onCreateOfferSuccess(desc) {
      await pc1.setLocalDescription(desc);
      await pc2.setRemoteDescription(desc);
      const answer = await pc2.createAnswer(); // 创建 answer
      await onCreateAnswerSuccess(answer);
    }
    async function onCreateAnswerSuccess(desc) {
      await pc2.setLocalDescription(desc);
      await pc1.setRemoteDescription(desc);
    }
    async function onIceCandidate(pc, event) {
      try {
        await getOtherPc(pc).addIceCandidate(event.candidate); // 设置 ice 候选项
        onAddIceCandidateSuccess(pc);
      } catch (e) {
        onAddIceCandidateError(pc, e);
      }
      console.log(
        `${getName(pc)} ICE candidate:\n${
          event.candidate ? event.candidate.candidate : "(null)"
        }`
      );
    }
    function onAddIceCandidateSuccess(pc) {
      console.log(`${getName(pc)} addIceCandidate success`);
    }
    function onAddIceCandidateError(pc, error) {
      console.log(
        `${getName(pc)} failed to add ICE Candidate: ${error.toString()}`
      );
    }
  </script>
</div>

[View source on GitHub](https://github.com/webrtc/samples/tree/gh-pages/src/content/peerconnection/pc1)

## 写在最后

作为「指南」，本文从比较浅的层次介绍了 `WebRTC` 技术，很多细节及原理性的内容，限于篇幅未作深入阐述。笔者也是刚接触几个月，如有谬误，还请告知。
