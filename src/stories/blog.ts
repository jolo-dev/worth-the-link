export const blog = `
Thoughts on SST

Developers are increasingly adopting serverless computing since it removes the requirement to manage infrastructure. When it comes to creating Infrastructure as Code, AWS CDK has become a favored option. Nonetheless, the Developer Experience (DX) for creating serverless applications with CDK isn’t optimal. For instance, the deployment time can be excessively long when building REST APIs and debugging Lambdas can become tedious.

The Serverless Stack (SST) framework simplifies the process of building serverless applications on AWS. This article explores SST’s architecture, features, and benefits for building and deploying serverless applications.

What’s wrong with Vanilla CDK?
AWS CDK (I call it vanilla CDK) generates Cloudformation, AWS native Infrastructure as Code, by using a high-level programming language such as Typescript, Python, or Go.

As someone who has worked on numerous CDK codebases, the deployment process and developer setup have often caused me delays. Though CDK hotswap has been a significant improvement, it still tends to be sluggish.

Developing your REST API with API Gateway and Lambdas in CDK is quite painful. AWS SAM and Serverless Framework offer local testing but often I believe you get better feedback when directly deploying on AWS. Debugging with CDK is not streamlined as you need to find the correlated logs. And we all know, the AWS Console sucks.

In my article, Strategies for a faster Lambda Development, I was mentioning SST.

Why SST?
SST offers powerful monitoring and debugging tools while allowing developers to focus on application logic. It comes with its own UI console based on your CDK stack.

Why should I care about its Console?
Picture this scenario: You have created a stack using several Lambdas and now you need to debug them. To do so, you head over to AWS Cloudwatch and try to locate their logs. Unfortunately, you realize that you have redeployed the stack and now you have to sift through numerous logs to locate the correct log file.

SST’s console shows their log files which makes debugging so much faster.

However, you won’t find all AWS resources but only those which are related to Serverless (Lambdas, S3, DynamoDB etc.). When utilizing a serverless approach, then it should be fine though 😉

Should I still consider developing it locally first?
With SST you don’t have to do it anymore as it (re)deploys super fast and it feels like local development. Really, try it yourself 🤯

It feels like that I do not wait for anything. Whereas in CDK’s hotswap, I have to wait until it’s deployed (you don’t see it but I was hitting refresh the whole time).

P.S.: I was a bit slow when changing the Lambda above, I am pretty sure SST is much faster.

Furthermore, SST allows live Lambda live developing which can be integrated into your IDE. That means you could set breakpoints and debug your application while it’s deployed on AWS.

Developer Experience (DX)
In general, the SST team put a lot of effort into the Developer Experience (DX). Their constructs are very intuitive. Here is an example with their API- construct.

const api = new Api(this, 'KeyVaultApi', {
  defaults: {
    function: {
      runtime: 'nodejs18.x',
    },
  },
  routes: {
    "GET /ping": "packages/functions/src/Foo/ping.handler",
    "GET /pong": "packages/functions/src/Foo/pong.handler",
  },
});
instead of

const pingLambda = new lambda.NodejsFunction(this, 'Ping', {
  functionName: 'ping',
  entry: 'src/Foo/ping.ts',
  handler: 'handler',
  runtime: Runtime.NODEJS_18_X,
  bundling: {
    minify: true,
  },
});

const pongLambda = new lambda.NodejsFunction(this, 'Pong', {
  functionName: 'pong',
  entry: 'src/Foo/pong.ts',
  handler: 'handler',
  runtime: Runtime.NODEJS_18_X,
  bundling: {
    minify: true,
  },
});

const pingPongApi = new apigateway.RestApi(this, 'ping-pong-api');
const ping = pingPongApi.root.addResource('ping');
ping.addMethod('GET', new apigateway.LambdaIntegration(pingLambda));
const pong = keyGenRestApi.root.addResource('pong');
pong.addMethod('GET', new apigateway.LambdaIntegration(pongLambda));
Cool, we reduced the lines of code by 14 and make the code more readable 😎.

Use vanilla CDK
SST, being built on top of CDK, allows for the integration of CDK constructs. This means that despite using SST, you still have the option to utilize the powerful features of CDK.

Documentation
I am always annoyed about CDK’s API reference documentation because there is no search and CMD + F does just half of its job. However, SST's implementation of Algolia's search feature makes it incredibly easy to locate not just their constructs, but anything relevant to your search term.

Wow, SST is amazing but does it have a downside?
Yep, unfortunately, there are some limitations.

Not possible to do cross-account deployments with CDK pipelines
We had already some CDK pipelines established and in fact, I have written an article about it. However, in the end, you have a CDK app that should be deployable via CDK pipelines… that’s what I thought.

I spent some time figuring out why it does not deploy to a different account. Assuming roles from a different account is not straightforward with CDK pipelines and it usually works with Vanilla CDK.

I found out that if you node_modules/sst/constructs/Stack.js manually remove Line 69 and Line 74 - 78, it

Stack.checkForPropsIsConstruct(id, props);
// Stack.checkForEnvInProps(id, props);

super(scope, stackId, {
  ...props,
//  env: {
//    account: app.account,
//    region: app.region,
//  },
  synthesizer: props?.synthesizer || Stack.buildSynthesizer(),
});
SST cannot be integrated into an existing CDK stack (but the other way round works)
I had problems integrating SST in my current CDK stack as if you bootstrapped your project with npx cdk init —lang typescript , you may get incompatibility between ESM and CommonJS as CDK is compiled to CommonJS (which is older) and SST uses ESM (which is a modern and modular approach).

UI is limited to Serverless Only services
SST console shows only Serverless service but no EC2 or ECS containers.

SST is not good for developing a library or constructs
If you want to create CDK library consisting of custom constructs, SST won’t be able to satisfy you. Which is fine as that’s not their intention.

However, if you intend to do so, you may read my thought about using Projen 🫣

Conclusion
If you’re a developer, you’ll appreciate how well SST caters to your needs. It provides a smooth and integrated solution for building full-stack applications, and guarantees an exceptional developer experience.

The console provides a detailed overview of your serverless stack’s associated resources and presents comprehensive outputs. No need to find nothing on the AWS console 😜

Hopefully, this blog was helpful in showing you how to enhance your stack and take it to the next level. Consider using SST for your future AWS projects.

Still in doubt? Watch Fireship’s 100 seconds of SST.`