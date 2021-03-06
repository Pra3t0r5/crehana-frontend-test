import { FC } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PublicIcon from "@mui/icons-material/Public";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { CountryProps } from "../../model";


const Country: FC<CountryProps> = ({ country }) => {
  return (
    <>
      <Card
        sx={{ width: 500, m: "auto" }}
        key={country.code}
        id="country-detail"
        data-testid="Country"
      >
        <CardHeader
          id="country-detail--header"
          avatar={
            <Avatar
              sx={{ bgcolor: "lightgray", height: 80, width: 80, fontSize: 45 }}
              aria-label="flag"
            >
              {country.emoji}
            </Avatar>
          }
          title={country.name}
          titleTypographyProps={{ variant: "h3" }}
          subheader={country.code}
        />
        <CardContent id="country-detail--content">
          <List
            id="country-detail--content--list"
            subheader={
              <ListSubheader component="div">
                Detailed Information
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemIcon>
                <ShortcutIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={country.code} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CurrencyExchangeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={country.currency} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PublicIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={country.continent?.name} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LanguageIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Languages" />
            </ListItem>
            <Collapse in={true} timeout="auto">
              <List
                component="div"
                disablePadding
                id="country-detail--content--list-lang"
              >
                {country.languages?.map((lang) => (
                  <ListItem sx={{ pl: 4 }} key={lang.code}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={lang.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <ListItem>
              <ListItemIcon>
                <LocationCityIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={country.capital} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default Country;
