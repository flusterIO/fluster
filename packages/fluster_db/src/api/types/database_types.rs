pub trait WithProto<ProtoType, DatabaseType> {
    fn to_proto(&self) -> ProtoType;
    fn from_proto() -> DatabaseType;
}

