use std::ops::Index;

use rayon::prelude::*;

use crate::features::ai::data::constants::VECTOR_DIMENSIONS;

pub fn flatten_vector(data: Vec<Vec<f32>>) -> Vec<f32> {
    if data.is_empty() {
        return (0..VECTOR_DIMENSIONS).map(|_| 0.0).collect::<Vec<f32>>();
    }
    let vector_dimensions = data.index(0).len();
    let mut res: Vec<f32> = vec![0.0; vector_dimensions];
    for vector_data in data.iter() {
        for (i, &val) in vector_data.iter().enumerate() {
            res[i] += val;
        }
    }
    let average_over = data.len();
    let res = res.into_par_iter().map(|x| x / (average_over as f32));
    res.collect()
}
