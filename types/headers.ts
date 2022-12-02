type CacheControlHeader = 'no-cache' | 'no-store' | `max-age=${number}` | `max-stale${`=${number}` | never}` | `min-fresh=${number}` | 'no-transform' | 'only-if-cached' | 'cache-extension';

type UnionToFunc<T> = T extends unknown ? (arg: T) => void : never;
type UnionToIntersection<U> = UnionToFunc<U> extends (arg: infer Arg) => void ? Arg : never;
type LastInUnion<U> = UnionToIntersection<UnionToFunc<U>> extends (x: infer L) => void ? L : never;
type UnionToTuple<T, L = LastInUnion<T>> = [L] extends [never] ? [] : [...UnionToTuple<Exclude<T, L>>, L];

type EnumerateTuple<T extends string[], Buffer extends string = ''> =
    T extends [infer R1, ...infer R2]
        ? Buffer extends ''
            ? R2 extends string[]
                ? R1 extends string
                    ? EnumerateTuple<R2, R1>
                    : Buffer
                : Buffer
            :  R2 extends string[]
                ? R1 extends string
                    ? EnumerateTuple<R2, `${Buffer}, ${R1}`>
                    : Buffer
                : Buffer
            : Buffer
;

type Enumerate<T extends string> = EnumerateTuple<UnionToTuple<T>>;

type AppendArgument<Fn extends Function, A> = Fn extends ((...args: infer T) => infer R)
? (...args: [...T, A]) => R
: never

type TypeA = AppendArgument<(Z: 1) => true, 100>;

type TypeB = Enumerate<CacheControlHeader>;

export interface AuthenticationHeaders {
    'WWW-Authenticate'?: string;
    Authorization?: string;
    'Proxy-Authenticate'?: string;
    'Proxy-Authorization'?: string;
}

export interface GeneralHeaders {
    Age?: string;
    /**
     * Used to specify directives that MUST be obeyed by all caching mechanisms along the request/response chain.
     * @see [Cache-Control spec (Section 14.9)](https://www.rfc-editor.org/rfc/rfc2616#section-14.9)
     * @example { 'Cache-Control': 'max-age=31536000' }
     */
    'Cache-Control'?: CacheControlHeader;
    'Clear-Site-Data'?: string;
    Expires?: string;
    Pragma?: string;
    Warning?: string;
}

export interface ClientHintsHeaders {
    'Accept-CH'?: string;
    'Accept-CH-Lifetime'?: string;
}

export interface UserAgentClientHintsHeaders {
    'Sec-CH-UA'?: string;
    'Sec-CH-UA-Arch'?: string;
    'Sec-CH-UA-Bitness'?: string;
    'Sec-CH-UA-Full-Version'?: string;
    'Sec-CH-UA-Full-Version-List'?: string;
    'Sec-CH-UA-Mobile'?: string;
    'Sec-CH-UA-Model'?: string;
    'Sec-CH-UA-Platform'?: string;
    'Sec-CH-UA-Platform-Version'?: string;
}

export interface DeviceClientHintsHeaders {
    'Content-DPR'?: string;
    'Device-Memory'?: string;
    DPR?: string;
    'Viewport-Width'?: string;
    Width?: string;
}

export interface NetworkClientHintsHeaders {
    Downlink?: string;
    ECT?: string;
    RTT?: string;
    'Save-Data'?: string;
}

export interface ConditionalsHeaders {
    'Last-Modified'?: string;
    ETag?: string;
    'If-Match'?: string;
    'If-None-Match'?: string;
    'If-Modified-Since'?: string;
    'If-Unmodified-Since'?: string;
    Vary?: string;
}

export interface ConnectionManagementHeaders {
    Connection?: string;
    'Keep-Alive'?: string;
}

export interface ContentNegotiationHeaders {
    Accept?: string;
    'Accept-Encoding'?: string;
    'Accept-Language'?: string;
}

export interface ControlsHeaders {
    Expect?: string;
    'Max-Forwards'?: string;
}

export interface CookiesHeaders {
    Cookie?: string;
    'Set-Cookie'?: string;
}

export interface CORSHeaders {
    'Access-Control-Allow-Origin'?: string;
    'Access-Control-Allow-Credentials'?: string;
    'Access-Control-Allow-Headers'?: string;
    'Access-Control-Allow-Methods'?: string;
    'Access-Control-Expose-Headers'?: string;
    'Access-Control-Max-Age'?: string;
    'Access-Control-Request-Headers'?: string;
    'Access-Control-Request-Method'?: string;
    Origin?: string;
    'Timing-Allow-Origin'?: string;
}

export interface DownloadsHeaders {
    'Content-Disposition'?: string;
}

export interface MessageBodyInformationHeaders {
    'Content-Length'?: string;
    'Content-Type'?: string;
    'Content-Encoding'?: string;
    'Content-Language'?: string;
    'Content-Location'?: string;

}

export interface ProxiesHeaders {
    Forwarded?: string;
    'X-Forwarded-For'?: string;
    'X-Forwarded-Host'?: string;
    'X-Forwarded-Proto'?: string;
    Via?: string;
}

export interface RedirectsHeaders {
    Location?: string;
}

export interface RequestContextHeaders {
    From?: string;
    Host?: string;
    Referer?: string;
    'Referrer-Policy'?: string;
    'User-Agent'?: string;
}

export interface ResponseContextHeaders {
    Allow?: string;
    Server?: string;
}

export interface RangeRequestsHeaders {
    'Accept-Ranges'?: string;
    Range?: string;
    'If-Range'?: string;
    'Content-Range'?: string;
}

export interface SecurityHeaders {
    'Cross-Origin-Embedder-Policy'?: string;
    'Cross-Origin-Opener-Policy'?: string;
    'Cross-Origin-Resource-Policy'?: string;
    'Content-Security-Policy'?: string;
    'Content-Security-Policy-Report-Only'?: string;
    'Expect-CT'?: string;
    'Feature-Policy'?: string;
    'Origin-Isolation'?: string;
    'Strict-Transport-Security'?: string;
    'Upgrade-Insecure-Requests'?: string;
    'X-Content-Type-Options'?: string;
    'X-Download-Options'?: string;
    'X-Frame-Options'?: string;
    'X-Permitted-Cross-Domain-Policies'?: string;
    'X-Powered-By'?: string;
    'X-XSS-Protection'?: string;
}

export interface FetchMetadataRequestHeadersHeaders {
    'Sec-Fetch-Site'?: string;
    'Sec-Fetch-Mode'?: string;
    'Sec-Fetch-User'?: string;
    'Sec-Fetch-Dest'?: string;
    'Service-Worker-Navigation-Preload'?: string;
}

export interface ServerSentEventsHeaders {
    'Last-Event-ID'?: string;
    NEL?: string;
    'Ping-From'?: string;
    'Ping-To'?: string;
    'Report-To'?: string;
}

export interface TransferEncodingHeaders {
    'Transfer-Encoding'?: string;
    TE?: string;
    Trailer?: string;
}

export interface WebSocketsHeaders {
    'Sec-WebSocket-Key'?: string;
    'Sec-WebSocket-Extensions'?: string;
    'Sec-WebSocket-Accept'?: string;
    'Sec-WebSocket-Protocol'?: string;
    'Sec-WebSocket-Version'?: string;
}

export interface OtherHeaders {
    'Accept-Push-Policy'?: string;
    'Accept-Signature'?: string;
    'Alt-Svc'?: string;
    Date?: string;
    'Early-Data'?: string;
    'Large-Allocation'?: string;
    Link?: string;
    'Push-Policy'?: string;
    'Retry-After'?: string;
    Signature?: string;
    'Signed-Headers'?: string;
    'Server-Timing'?: string;
    'Service-Worker-Allowed'?: string;
    SourceMap?: string;
    Upgrade?: string;
    'X-DNS-Prefetch-Control'?: string;
    'X-Firefox-Spdy'?: string;
    'X-Pingback'?: string;
    'X-Requested-With'?: string;
    'X-Robots-Tag'?: string;
    'X-UA-Compatible'?: string;
}

export interface Headers extends
    AuthenticationHeaders,
    GeneralHeaders,
    ClientHintsHeaders,
    UserAgentClientHintsHeaders,
    DeviceClientHintsHeaders,
    NetworkClientHintsHeaders,
    ConditionalsHeaders,
    ConnectionManagementHeaders,
    ContentNegotiationHeaders,
    ControlsHeaders,
    CookiesHeaders,
    CORSHeaders,
    DownloadsHeaders,
    MessageBodyInformationHeaders,
    ProxiesHeaders,
    RedirectsHeaders,
    RequestContextHeaders,
    ResponseContextHeaders,
    RangeRequestsHeaders,
    SecurityHeaders,
    FetchMetadataRequestHeadersHeaders,
    ServerSentEventsHeaders,
    TransferEncodingHeaders,
    WebSocketsHeaders,
    OtherHeaders { };

const A: Headers = {
    Via: '111'
}