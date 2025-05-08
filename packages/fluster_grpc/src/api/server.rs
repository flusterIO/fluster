pub mod proto {
    tonic::include_proto!("mdx.v1");
}

// type EchoResult<T> = Result<Response<T>, Status>;

// #[derive(Default)]
// pub struct EchoServer {}

// #[tonic::async_trait]
// impl pb::echo_server::Echo for EchoServer {
//     async fn unary_echo(&self, request: Request<EchoRequest>) -> EchoResult<EchoResponse> {
//         let message = request.into_inner().message;
//         Ok(Response::new(EchoResponse { message }))
//     }
// }

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // let addr = "[::1]:50051".parse().unwrap();
    // Server::builder()
    //     .add_service()

    // let server = EchoServer::default();

    // let svc = pb::echo_server::EchoServer::with_interceptor(server, check_auth);

    // Server::builder().add_service(svc).serve(addr).await?;

    Ok(())
}

// fn check_auth(req: Request<()>) -> Result<Request<()>, Status> {
//     let token: MetadataValue<_> = "Bearer some-secret-token".parse().unwrap();

//     match req.metadata().get("authorization") {
//         Some(t) if token == t => Ok(req),
//         _ => Err(Status::unauthenticated("No valid auth token")),
//     }
// }
