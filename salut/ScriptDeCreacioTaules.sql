CREATE TABLE Usuari(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Correu VARCHAR (250),
    Contrssenya VARCHAR (250)
);

CREATE TABLE Perfil(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UsuariId INT NOT NULL,
    Nom VARCHAR (50),
    Cognoms VARCHAR (100),
    DataNeixament date,
    Pes float,
    Alçada float,
    Genere VARCHAR(10),
    foreign key (UsuariId)
		REFERENCES Usuari(Id)
);

CREATE TABLE Visita(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    PerfilId INT NOT NULL,
    DataVisita datetime,
    Ubicacio VARCHAR(250),
    Descripcio VARCHAR(400),
    TractamentId INT,
	foreign key (PerfilId)
		REFERENCES Perfil(Id),
	foreign key (TractamentId) references Tractament (Id)
);

CREATE TABLE Tractament(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    PerfilId INT NOT NULL,
    DataInici datetime,
    DataFinal datetime,
	foreign key (PerfilId)
		REFERENCES Perfil(Id)
);

CREATE TABLE Medicament(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Nom varchar(150),
    Descripcio VARCHAR (400)
);

CREATE TABLE Periodicitat(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TractamentId INT NOT NULL,
    MedicamentId INT NOT NULL,
    Periode VARCHAR (50),
    foreign key (TractamentId) references Tractament (Id),
    foreign key (MedicamentId) references Medicament (Id)
);

CREATE TABLE Alergia(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Nom varchar(100),
    Descripcio VARCHAR (400)
)


