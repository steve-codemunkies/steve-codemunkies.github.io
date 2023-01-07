const handler = (event: AWSCloudFrontFunction.Event): AWSCloudFrontFunction.Request =>
{
    const { request } = event;
    const { uri } = request;

    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
};

export default handler;