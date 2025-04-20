use mdx_proto::mdx_service_server::MdxService;

pub mod mdx_proto {
    // include!(concat!(env!("FLUSTER_NATIVE_ROOT"), "/target/mdx.v1.rs"));

    tonic::include_proto!("mdx.v1");
}

#[derive(Debug, Default)]
pub struct MdxServiceHandler {}
