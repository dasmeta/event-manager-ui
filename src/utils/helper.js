export const isError = item => !!item.error;
export const isFail = item => !!item.fail;
export const isPreconditionFail = item => !!item.preconditionFail;
export const isMissing = item => !!item.missing;
export const isAnomaly = item => item.subscriptionCount > item.topicCount;
export const isSuccess = item => !isError(item) && !isFail(item) && !isMissing(item) && !isAnomaly(item);
