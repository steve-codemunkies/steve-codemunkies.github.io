import { handler } from '../../cfd-fn/url-rewrite';

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

describe('testing the CloudFront Function', () => {

    test('when the uri ends in / then index.html should be appended', () => {
        const cffRequest: AWSCloudFrontFunction.Request = {
            method: 'GET',
            uri: '/test/',
            querystring: cffValue,
            headers: cffValue,
            cookies: cffValue
        };

        const cffEvent: AWSCloudFrontFunction.Event = {
            version: '1.0',
            context: cffContext,
            viewer: cffViewer,
            request: cffRequest,
            response: cffResponse,
        };

        const returnedRequest = handler(cffEvent);

        expect(returnedRequest).toBe(cffRequest);
        expect(returnedRequest.uri).toBe('/test/index.html');
    });

    test('when the uri does not contain . then  /index.html should be appended', () => {
        const cffRequest: AWSCloudFrontFunction.Request = {
            method: 'GET',
            uri: '/test',
            querystring: cffValue,
            headers: cffValue,
            cookies: cffValue
        };

        const cffEvent: AWSCloudFrontFunction.Event = {
            version: '1.0',
            context: cffContext,
            viewer: cffViewer,
            request: cffRequest,
            response: cffResponse,
        };

        const returnedRequest = handler(cffEvent);

        expect(returnedRequest).toBe(cffRequest);
        expect(returnedRequest.uri).toBe('/test/index.html');
    });

    test('when the uri has a file extension it should be unaltered', () => {
        const cffRequest: AWSCloudFrontFunction.Request = {
            method: 'GET',
            uri: '/test/file.png',
            querystring: cffValue,
            headers: cffValue,
            cookies: cffValue
        };

        const cffEvent: AWSCloudFrontFunction.Event = {
            version: '1.0',
            context: cffContext,
            viewer: cffViewer,
            request: cffRequest,
            response: cffResponse,
        };

        const returnedRequest = handler(cffEvent);

        expect(returnedRequest).toBe(cffRequest);
        expect(returnedRequest.uri).toBe('/test/file.png');
    });

});