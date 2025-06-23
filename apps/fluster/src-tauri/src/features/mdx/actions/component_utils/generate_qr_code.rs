use fast_qr::convert::{svg::SvgBuilder, Builder, Shape};
use fast_qr::qr::QRBuilder;

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[tauri::command]
#[specta::specta]
pub async fn get_qr_code_svg(content: String) -> FlusterResult<String> {
    let qrcode = QRBuilder::new(content)
        .build()
        .map_err(|_| FlusterError::FailToCreateQrCode)?;
    let s = SvgBuilder::default()
        .shape(Shape::RoundedSquare)
        .to_str(&qrcode);
    Ok(s)
}
