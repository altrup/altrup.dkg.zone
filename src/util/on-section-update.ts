import { createClient, RealtimeChannel } from "@supabase/supabase-js";

export const onSectionUpdate = (
  {
    supabaseURL,
    supabaseAnonKey,
    supabaseTableName,
  }: {
    supabaseURL: string;
    supabaseAnonKey: string;
    supabaseTableName: string;
  },
  callback: () => unknown,
) => {
  const supabase = createClient(supabaseURL, supabaseAnonKey);
  let channel: RealtimeChannel | null = null;

  supabase.realtime
    .setAuth()
    .then(() => {
      channel = supabase
        .channel(`table:${supabaseTableName}`, { config: { private: true } })
        .on("broadcast", { event: "*" }, () => {
          callback();
        })
        .subscribe();
    })
    .catch((err) => {
      console.error(err);
    });

  return () => {
    const currentChannel = channel;
    if (!currentChannel) return;

    supabase.realtime
      .setAuth()
      .then(() => {
        supabase.removeChannel(currentChannel).catch((err) => {
          console.error(err);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
