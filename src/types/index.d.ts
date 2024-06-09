type expressRequest = import('express').Request;
interface TypedRequest<T>  extends expressRequest { body: T}