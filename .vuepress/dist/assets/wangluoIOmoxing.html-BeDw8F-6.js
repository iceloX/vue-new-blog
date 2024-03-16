import{_ as a,o as e,c,a as n}from"./app-K_NCcnF4.js";const s={},p=n(`<h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><h3 id="阻塞与非阻塞" tabindex="-1"><a class="header-anchor" href="#阻塞与非阻塞" aria-hidden="true">#</a> 阻塞与非阻塞</h3><p>阻塞与非阻塞，用于描述调用者在等待返回结果时的状态。</p><ul><li>阻塞：调用者发起请求后，会一直等待返回结果，这期间当前线程会被挂起（阻塞）。</li><li>非阻塞：调用者发起请求后，会立刻返回，当前线程也不会阻塞。该调用不会立刻得到结果，调用者需要定时轮询查看处理状态。</li></ul><h3 id="同步与异步" tabindex="-1"><a class="header-anchor" href="#同步与异步" aria-hidden="true">#</a> 同步与异步</h3><p>而同步与异步，用于描述调用结果的返回机制（或者叫通信机制）。</p><ul><li>同步：调用者发起请求后，会一直等待返回结果，即由调用者主动等待这个调用结果。</li><li>异步：调用者发起请求后，会立刻返回，但不会立刻得到这个结果，而是由被调者在执行结束后主动通知（如 Callback）调用者。</li></ul><p>生活案例说明：说到烧水，我们都是通过热水壶来烧水的。在很久之前，科技还没有这么发达的时候，如果我们要烧水， 需要把水壶放到火炉上，我们通过观察水壶内的水的沸腾程度来判断水有没有烧开。随着科技的发展，现在市面上的水壶都有了提醒功能，当我们把水壶插电之后，水壶水烧开之后会通过声音提醒我们水开了。</p><p>对于烧水这件事儿来说，传统水壶的烧水就是同步的，高科技水壶的烧水就是异步的。</p><h3 id="用户空间、内核空间、系统调用" tabindex="-1"><a class="header-anchor" href="#用户空间、内核空间、系统调用" aria-hidden="true">#</a> 用户空间、内核空间、系统调用</h3><p>操作系统的进程空间可以分为用户空间（User Space）和内核空间（Kernel Space），它们需要不同的执行权限。</p><ul><li>大多数系统交互式操作需要在内核空间中运行，比如设备 IO 操作。</li><li>我们的应用程序运行在用户空间，是不具备系统级的直接操作权限的。如果应用程序想要访问系统核心功能，必须通过系统调用（System Call）来完成。比如调用<code>recv()</code>函数，会将输入缓冲区中的内容拷贝到用户缓冲区。</li><li>系统调用运行在内核空间，是操作系统为应用程序提供的接口。</li></ul><p><img src="https://ae02.alicdn.com/kf/He62722084cd944b58aa1ba077eb9992bx.png" alt="image.png"></p><h2 id="五种io模型" tabindex="-1"><a class="header-anchor" href="#五种io模型" aria-hidden="true">#</a> 五种IO模型</h2><p>Linux 系统为我们提供五种可用的 IO 模型：阻塞式 IO 模型、非阻塞式 IO 模型、IO 多路复用模型、信号驱动 IO 模型和异步 IO 模型。其中前四种都是同步IO，而最后一种是异步IO</p><h3 id="同步阻塞io模型" tabindex="-1"><a class="header-anchor" href="#同步阻塞io模型" aria-hidden="true">#</a> 同步阻塞IO模型</h3><p><code>Blocking IO</code>：应用进程从发起 IO 系统调用，至内核返回成功标识，这整个期间是处于阻塞状态的。</p><p><img src="https://ae04.alicdn.com/kf/Hea55f51a944e464ca9f93899c2ffdb36l.png" alt="image.png"></p><p>在Java程序中，使用Socket 套接字来进行网络编程；</p><blockquote><p>Socket 中文翻译为套接字，是计算机网络中进程间进行双向通信的端点的抽象。一个 Socket 代表了网络通信的一端，是由操作系统提供的进程间通信机制。</p><p>要想实现网络通信，至少需要一对 Socket，其中一个运行在客户端，称之为 Client Socket；另一个运行在服务器端，称之为 Server Socket。</p><p>Socket 之间的连接过程可以分为三个步骤：（1）服务器监听；（2）客户端连接；（3）连接确认。</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ServerSocket</span> server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServerSocket</span><span class="token punctuation">(</span><span class="token number">6666</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 监听指定端口</span>
<span class="token class-name">Socket</span> sock <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有客户端连接进来，<code>accept()</code>方法会阻塞并一直等待。如果有多个客户端同时连接进来，<code>ServerSocket</code>会把连接扔到队列里，然后一个一个处理。对于Java程序而言，只需要通过循环不断调用<code>accept()</code>就可以获取新的连接。</p><h3 id="非阻塞io模型" tabindex="-1"><a class="header-anchor" href="#非阻塞io模型" aria-hidden="true">#</a> 非阻塞IO模型</h3><p><code>Non-Blocking</code>：应用进程可以将 Socket 设置为非阻塞，这样应用进程在发起 IO 系统调用后，会立刻返回。应用进程可以轮询的发起 IO 系统调用，直到内核返回成功标识。</p><p><img src="https://ae04.alicdn.com/kf/H9426adc43f204825b21e08f193c66689j.png" alt="image.png"></p><p>在 Java NIO（自Java 1.4以来） 就是一种同步非阻塞模型。</p><p>NIO是面向==缓冲区==或者==面向块编程==的。数据读取到一个它稍后处理的缓冲区，需要向缓冲区中前后移动，这就增加了处理过程中的灵活性，使用它可以提供非阻塞式的高伸缩性网络。</p><p>TODO：《Java NIO 的使用》</p><h3 id="io多路复用模型" tabindex="-1"><a class="header-anchor" href="#io多路复用模型" aria-hidden="true">#</a> IO多路复用模型</h3><p><code>IO Multiplexin</code>：可以将多个应用进程的 Socket 注册到一个 Select（多路复用器）上，然后使用一个进程来监听该 Select（该操作会阻塞），Select 会监听所有注册进来的 Socket。只要有一个 Socket 的数据准备好，就会返回该Socket。再由应用进程发起 IO 系统调用，来完成数据读取。</p><p><img src="https://ae02.alicdn.com/kf/Hc6faf62b74a24455883418a01914ffd0q.png" alt="image.png"></p><p>多路复用模型在一些地方也称为是事件驱动IO模型；IO多路复用是指内核一旦发现进程指定的一个或者多个IO条件准备读取，它就通知该进程。</p><p>通过NIO实现的Reactor模式即是I/O多路复用模型的实现</p><p>TODO：《什么是Reactor模式》</p><h3 id="信号驱动-io-模型" tabindex="-1"><a class="header-anchor" href="#信号驱动-io-模型" aria-hidden="true">#</a> 信号驱动 IO 模型</h3><p><code>Signal Driven IO</code>：可以为 Socket 开启信号驱动 IO 功能，应用进程需向内核注册一个信号处理程序，该操作并立即返回。当内核中有数据准备好，会发送一个信号给应用进程，应用进程便可以在信号处理程序中发起 IO 系统调用，来完成数据读取了。</p><p><img src="https://ae02.alicdn.com/kf/Hbd93a8340c814955a47eb78aef21d51fH.png" alt="image.png"></p><p>系统注册了ISGIO信号处理函数，并且启动了信号驱动式IO后，就可以继续执行程序了，等到数据报准备好之后，内核会发送一个SIGIO信号给应用进程，然后应用进程在信号处理函数中调用recvfrom读取数据报。</p><p>这种模型在内核等待数据报达到期间进程不会被阻塞，可以继续执行</p><h3 id="异步io模型" tabindex="-1"><a class="header-anchor" href="#异步io模型" aria-hidden="true">#</a> 异步IO模型</h3><p><code>Asynchronous IO</code>：应用进程发起 IO 系统调用后，会立即返回。当内核中数据完全准备后，并且也复制到了用户空间，会产生一个信号来通知应用进程。</p><p><img src="https://ae05.alicdn.com/kf/H342c4a9cb4924cd0971c1dff3c219613J.png" alt="image.png"></p><p>步IO模型才是最理想的IO模型，在异步IO模型中，当用户线程发起read操作之后，立刻就可以开始去做其它的事。注意，异步IO是需要操作系统的底层支持，在Java 7中，提供了Asynchronous IO。</p><p>通过AIO实现的Proactor模式即是异步I/O模型的实现</p>`,44),o=[p];function t(i,r){return e(),c("div",null,o)}const l=a(s,[["render",t],["__file","wangluoIOmoxing.html.vue"]]);export{l as default};