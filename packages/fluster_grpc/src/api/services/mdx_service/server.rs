use proto::mdx_service_server::MdxService;

mod proto {
    tonic::include_proto!("mdx.v1");
}

#[derive(Debug, Default)]
struct MdxServiceStruct {}

impl MdxService for MdxServiceStruct {
    #[must_use]
    #[allow(
        elided_named_lifetimes,
        clippy::type_complexity,
        clippy::type_repetition_in_bounds
    )]
    fn save_note<'life0, 'async_trait>(
        &'life0 self,
        request: tonic::Request<super::SaveNoteRequest>,
    ) -> ::core::pin::Pin<
        Box<
            dyn ::core::future::Future<
                    Output = std::result::Result<
                        tonic::Response<super::SaveNoteResponse>,
                        tonic::Status,
                    >,
                > + ::core::marker::Send
                + 'async_trait,
        >,
    >
    where
        'life0: 'async_trait,
        Self: 'async_trait,
    {
        todo!()
    }
}
