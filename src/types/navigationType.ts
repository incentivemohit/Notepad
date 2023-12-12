export type RootStackParamList = {
  SplashScreen:undefined
  Home: undefined;
  SearchScreen: {
    searchParams: string;
  };
  AddNote: undefined;
  EditNote: {
    id: string;
  };

  AddTodo: undefined;
  DeleteScreen: {
    deleteParams: string;
  };
};

export type BottomTabParamList = {
  NotesHomeScreen: undefined;
  TodosHomeScreen: undefined;
};
