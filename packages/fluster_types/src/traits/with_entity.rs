pub trait WithEntity<EntityType> {
    fn to_entity() -> EntityType;
}
