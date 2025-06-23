use crate::core::types::errors::errors::FlusterResult;

pub type DatabaseIndexSetupFunction = fn() -> FlusterResult<()>;
