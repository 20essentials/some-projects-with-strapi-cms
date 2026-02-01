//Just for Example
import { errors } from '@strapi/utils';
export const policyTokens = ['123'];

export default policyContext => {
  // console.log({ pathname: policyContext.request.url})
  // Example: { pathname: '/api/articles/get-random-article' }
  const policyToken = policyContext.request.query.policyToken;
  // console.log({ query: policyContext.request.query.policyToken });
  const thePathNameIsCorrect = policyContext.request.url.startsWith(
    '/api/articles/get-random-article'
  );
  const theRequestHasPolicyToken = policyTokens.includes(policyToken);
  if (thePathNameIsCorrect && theRequestHasPolicyToken) return true;
  //The custom message you put in PolicyError is not displayed to the client. It is only for internal logs.
  throw new errors.PolicyError('You must provide a valid policyToken in your URL', {
    policy: 'my-policy',
    myCustomKey: 'myCustomValue'
  });
};
