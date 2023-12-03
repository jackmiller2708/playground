import { IRegion, Region as TRegion } from '@interfaces/domain';
import { AdaptableRecordFactory } from '@models/application/utilities';
import { IRegion as IRegionDto } from '@interfaces/dtos';
import { NamedResource } from '../utilities';
import { AssetInfo } from '@models/application/assets';
import { List } from 'immutable';

const defaultValues: IRegion = {
  id: 0,
  name: '',
  names: List(),
  locations: List(),
  pokedexes: List(),
  versionGroups: List(),
  assetsInfo: List(),
  mainGeneration: NamedResource(),
};

const adaptor = (values?: IRegionDto): TRegion => {
  const {
    name,
    names,
    locations,
    version_groups,
    main_generation,
    pokedexes,
    ...others
  } = values ?? {};

  return Region({
    ...others,
    name,
    locations: List(locations?.map(NamedResource)),
    versionGroups: List(version_groups?.map(NamedResource)),
    pokedexes: List(pokedexes?.map(NamedResource)),
    assetsInfo: List([
      AssetInfo({
        name: `${name}-region-poster-art`,
        location: `assets/regions/${name}.jpg`,
      }),
    ]),
    mainGeneration: NamedResource(main_generation),
  });
};

export const Region = AdaptableRecordFactory<IRegionDto, IRegion>({
  defaultValues,
  adaptor,
});
