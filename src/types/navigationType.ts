export type RootStackParamList = {
  Home: undefined;
  SearchScreen: {
    searchParams: string;
  };
  AddNote: undefined;
  DeleteScreen: {
    deleteParams:string
  };
  AddTodo: undefined;
};

export type BottomTabParamList = {
  NotesHomeScreen: undefined;
  TodosHomeScreen: undefined;
};
