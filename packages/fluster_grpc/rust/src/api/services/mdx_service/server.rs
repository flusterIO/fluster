use mdx_proto::mdx_service_server::MdxService;

pub mod mdx_proto {
    tonic::include_proto!("mdx.v1");
}

#[derive(Debug, Default)]
pub struct MdxServiceHandler {}
