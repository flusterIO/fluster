use proto::mdx_service_server::MdxService;

mod proto {
    tonic::include_proto!("mdx.v1");
}

#[derive(Debug, Default)]
pub struct MdxServiceStruct {}

impl MdxService for MdxServiceStruct {}
