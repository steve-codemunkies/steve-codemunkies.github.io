import handler from '../../cfd-fn/url-rewrite';

const cffValue: AWSCloudFrontFunction.ValueObject = {
    key1: { value: 'text/plain' },
};

const cffResponseCookie: AWSCloudFrontFunction.ResponseCookie = {
    id: {
        value: 'text/plain',
        attributes: "Expires=Wed, 05 Apr 2021 07:28:00 GMT",
    },
    cookie1: {
        value: 'val1',
        attributes: "Secure; Domain=example.com; Expires=Wed, 05 Apr 2021 07:28:00 GMT",
        multiValue: [
            {
                value: 'val1',
                attributes: "Secure; Domain=example.com; Expires=Wed, 05 Apr 2021 07:28:00 GMT",
            },
            {
                value: "val2",
                attributes: "Path=/cat; Domain=example.com; Expires=Wed, 10 Jan 2021 07:28:00 GMT",
            }
        ]
    },
};

const cffResponse: AWSCloudFrontFunction.Response = {
    statusCode: 200,
    statusDescription: 'OK',
    headers: cffValue,
    cookies: cffResponseCookie,
};

const cffViewer: AWSCloudFrontFunction.Viewer = {
    ip: '192.168.0.1',
};

const cffContext: AWSCloudFrontFunction.Context = {
    distributionDomainName: 'd111111abcdef8.cloudfront.net',
    distributionId: 'EDFDVBD6EXAMPLE',
    eventType: 'viewer-response',
    requestId: 'EXAMPLEntjQpEXAMPLE_SG5Z-EXAMPLEPmPfEXAMPLEu3EqEXAMPLE==',
};

function BuildEvent(uri: string) : AWSCloudFrontFunction.Event {
    const cffRequest: AWSCloudFrontFunction.Request = {
        method: 'GET',
        uri: uri,
        querystring: cffValue,
        headers: cffValue,
        cookies: cffValue
    };

    return {
        version: '1.0',
        context: cffContext,
        viewer: cffViewer,
        request: cffRequest,
        response: cffResponse,
    };
}

describe('testing the CloudFront Function', () => {

    test('when the uri ends in / then index.html should be appended', () => {
        const event = BuildEvent('/test/');
        const returnedRequest = handler(event);

        expect(returnedRequest).toBe(event.request);
        expect(returnedRequest.uri).toBe('/test/index.html');
    });

    test('when the uri does not contain . then  /index.html should be appended', () => {
        const event = BuildEvent('/test');
        const returnedRequest = handler(event);

        expect(returnedRequest).toBe(event.request);
        expect(returnedRequest.uri).toBe('/test/index.html');
    });

    test('when the uri has a file extension it should be unaltered', () => {
        const event = BuildEvent('/test/file.png');
        const returnedRequest = handler(event);

        expect(returnedRequest).toBe(event.request);
        expect(returnedRequest.uri).toBe('/test/file.png');
    });

});