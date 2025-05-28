// #[frb(ignore)]
// pub fn paginate<T>(items: &[T], page_number: usize, items_per_page: usize) -> Option<&[T]> {
//     if page_number == 0 || items_per_page == 0 {
//         return None;
//     }

//     let start = (page_number - 1) * items_per_page;
//     let end = start + items_per_page;

//     if start < items.len() {
//         if end <= items.len() {
//             Some(&items[start..end])
//         } else {
//             Some(&items[start..])
//         }
//     } else {
//         None
//     }
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn paginate_works_properly() {
//         let items: Vec<usize> = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         let res1 = paginate(&items, 1, 4).expect("Did paginate arrary without throwing an error.");
//         let res2 = paginate(&items, 2, 4).expect("Did paginate arrary without throwing an error.");
//         let res3 = paginate(&items, 3, 4).expect("Did paginate arrary without throwing an error.");
//         assert_eq!(res1[0], items[0], "Matches index 0");
//         assert_eq!(res1[1], items[1], "Matches index 1");
//         assert_eq!(res1[2], items[2], "Matches index 2");
//         assert_eq!(res1[3], items[3], "Matches index 3");
//         assert_eq!(res2[0], items[4], "Matches index 4");
//         assert_eq!(res2[1], items[5], "Matches index 5");
//         assert_eq!(res2[2], items[6], "Matches index 6");
//         assert_eq!(res2[3], items[7], "Matches index 7");
//         assert_eq!(res3[0], items[8], "Matches index 8");
//         assert_eq!(res3[1], items[9], "Matches index 9");
//     }
// }
