import { Serializer } from "typedoc";
import { AngularIOSerializer } from "./io";
import { AngularProviderSerializer } from "./providers";

export function addUtilsToSerializer(serializer: Serializer): void {
  serializer.addSerializer(new AngularIOSerializer(serializer));
  serializer.addSerializer(new AngularProviderSerializer(serializer));
}